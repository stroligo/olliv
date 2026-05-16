/**
 * Exporta todas as mensagens do utilizador do transcript Cursor para Prompts.md
 * Execução: node scripts/export-prompts-from-transcript.mjs
 */
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import os from 'os'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** UUID do transcript (sem .jsonl) — pasta em ~/.cursor/projects/.../agent-transcripts/<uuid>/ */
const TRANSCRIPT_UUID = '7c937c22-9170-4331-92a3-67d1b4c843cc'

/** Pasta do projeto no Cursor (`users-gabrielstroligo-sites-localhost-olliv` etc.) */
const PROJECT_SLUG = 'Users-gabrielstroligo-Sites-localhost-olliv'

const OUT_PATH = path.join(__dirname, '..', 'Prompts.md')

const SYSTEM_STUB =
  /<user_query>\s*Briefly inform the user about the task result and perform any follow-up actions/im

function resolveTranscriptPath() {
  return path.join(
    os.homedir(),
    '.cursor/projects',
    PROJECT_SLUG,
    'agent-transcripts',
    TRANSCRIPT_UUID,
    `${TRANSCRIPT_UUID}.jsonl`,
  )
}

function fenceBlock(text) {
  let n = 3
  const open = '`'
  while (text.includes(open.repeat(n))) n++
  const f = open.repeat(n)
  return `${f}\n${text}\n${f}\n`
}

function extractUserQuery(text) {
  const m = text.match(/<user_query>\s*([\s\S]*)\s*<\/user_query>/i)
  return m ? m[1].trim() : text
}

async function collectPrompts(absPath) {
  const prompts = []
  const rl = readline.createInterface({
    input: fs.createReadStream(absPath, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  })
  for await (const line of rl) {
    if (!line.trim()) continue
    let o
    try {
      o = JSON.parse(line)
    } catch {
      continue
    }
    if (o.role !== 'user') continue
    const blocks = o.message?.content
    if (!Array.isArray(blocks)) continue
    for (const b of blocks) {
      if (b.type !== 'text' || typeof b.text !== 'string') continue
      let t = b.text.trim()
      if (!t || SYSTEM_STUB.test(t)) continue
      prompts.push(extractUserQuery(t))
      break
    }
  }
  return prompts
}

const transcriptAbs = resolveTranscriptPath()

if (!fs.existsSync(transcriptAbs)) {
  console.error('Transcript não encontrado:', transcriptAbs)
  console.error('Ajuste PROJECT_SLUG em scripts/export-prompts-from-transcript.mjs ao slug em ~/.cursor/projects/')
  process.exit(1)
}

const prompts = await collectPrompts(transcriptAbs)

const header = [
  '# Histórico de prompts da conversa',
  '',
  'Gerado por `scripts/export-prompts-from-transcript.mjs` a partir do transcript Cursor.',
  '',
  `- UUID do transcript: \`${TRANSCRIPT_UUID}\``,
  `- Slug do projeto Cursor: \`${PROJECT_SLUG}\``,
  `- Ordem: cronológica`,
  `- Total de mensagens do utilizador: **${prompts.length}**`,
  '',
  '**Omitidas:** repetições de sistema («Briefly inform the user about the task result…»).',
  '',
  '---',
  '',
].join('\n')

let md = header

prompts.forEach((p, i) => {
  md += `## Prompt ${i + 1}\n\n`
  md += fenceBlock(p)
  md += '---\n\n'
})

fs.writeFileSync(OUT_PATH, md, 'utf8')
console.log('Escrito:', OUT_PATH)
console.log('Prompts:', prompts.length)
