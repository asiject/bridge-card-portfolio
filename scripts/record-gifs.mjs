/**
 * 브릿지 카드 데모 GIF 녹화 스크립트
 * Playwright로 화면 녹화 후 ffmpeg로 GIF 변환
 */
import { chromium } from 'playwright'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import { execFileSync } from 'node:child_process'
import { mkdirSync, existsSync, readdirSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'

const BASE_URL = process.env.DEMO_URL || 'http://localhost:4173'
const OUTPUT_DIR = 'docs/gifs'
const FFMPEG = ffmpegInstaller.path

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const convertToGif = (inputPath, outputPath, durationSec, fps = 12, width = 960) => {
  const scale = `scale=${width}:-1:flags=lanczos`
  const palette = width <= 640 ? 'palettegen=max_colors=128[p]' : 'palettegen[p]'
  const filter = `${scale},fps=${fps},split[s0][s1];[s0]${palette};[s1][p]paletteuse`

  execFileSync(FFMPEG, [
    '-y',
    '-i',
    inputPath,
    '-t',
    String(durationSec),
    '-vf',
    filter,
    outputPath,
  ], { stdio: 'inherit' })
}

const clickFirstCard = async (page) => {
  await page.locator('.card-slot').first().click()
}

const runShortDemo = async (page) => {
  // 8초: 스플래시 → 가이드 → 게임 → 카드 플립·모달 → 닫기
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await wait(600)

  await page.getByRole('button', { name: '게임 시작' }).click()
  await wait(800)

  await page.getByRole('button', { name: '시작' }).click()
  await wait(1000)

  await page.getByLabel('시작').first().click()
  await wait(800)

  await clickFirstCard(page)
  await wait(2200)

  await page.getByLabel('닫기').click()
  await wait(1200)
}

const runFullDemo = async (page) => {
  // 15초: 카드 플레이 + 설정 + 딥 모드 + 셔플
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await wait(600)

  await page.getByRole('button', { name: '게임 시작' }).click()
  await wait(700)

  await page.getByRole('button', { name: '시작' }).click()
  await wait(900)

  await page.getByLabel('시작').first().click()
  await wait(700)

  await clickFirstCard(page)
  await wait(1800)
  await page.getByLabel('닫기').click()
  await wait(600)

  await page.getByLabel('메뉴').click()
  await wait(800)

  await page.getByRole('button', { name: /딥 모드|Deep Mode/i }).click()
  await wait(2500)

  await page.getByLabel('카드 섞기').click()
  await wait(4500)
}

const recordDemo = async (name, runFlow, durationSec) => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1280, height: 720 },
    },
  })

  const page = await context.newPage()
  let videoPath = ''

  try {
    await runFlow(page)
    await wait(500)
  } finally {
    const video = page.video()
    await page.close()
    await context.close()
    if (video) videoPath = await video.path()
    await browser.close()
  }

  if (!videoPath || !existsSync(videoPath)) {
    throw new Error(`${name} 비디오 파일을 찾을 수 없습니다.`)
  }

  const gifPath = join(OUTPUT_DIR, `demo-${durationSec}s.gif`)
  convertToGif(videoPath, gifPath, durationSec, 12, 960)

  const optimizedPath = join(OUTPUT_DIR, `demo-${durationSec}s-optimized.gif`)
  convertToGif(gifPath, optimizedPath, durationSec, 10, 640)

  unlinkSync(videoPath)
  unlinkSync(gifPath)

  console.log(`✅ ${optimizedPath} 생성 완료`)
  return optimizedPath
}

const main = async () => {
  mkdirSync(OUTPUT_DIR, { recursive: true })

  readdirSync(OUTPUT_DIR)
    .filter((file) => file.endsWith('.webm'))
    .forEach((file) => unlinkSync(join(OUTPUT_DIR, file)))

  console.log(`📹 녹화 대상: ${BASE_URL}`)
  console.log('--- 8초 버전 녹화 ---')
  await recordDemo('short', runShortDemo, 8)

  console.log('--- 15초 버전 녹화 ---')
  await recordDemo('full', runFullDemo, 15)

  console.log('🎉 모든 GIF 생성 완료')
}

main().catch((error) => {
  console.error('GIF 생성 실패:', error)
  process.exit(1)
})
