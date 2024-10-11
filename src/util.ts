import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user'
import moment, { Moment } from 'moment'

import mockData from './mockData'
import { format } from 'date-fns'

const getDateFromText = (text: string): Moment => {
  const last = text?.match(/\[\[(.+?)\]\]/g)?.slice(-1)[0]
  return moment(last?.replaceAll(/^(\[\[)|(\]\])$/g, ''), getPluginConfig()?.dateFormatter)
}

const removeDateFromText = (text: string, page?: string): string => {
  page && (text = text.replace(`#${page}`, ''))
  page && (text = text.replace(`[[${page}]]`, ''))

  const last = text?.match(/\[\[(.+?)\]\]/g)?.slice(-1)[0]
  if (!last) return convertHerfData(text)
  return convertHerfData(text.replace(last, '').trim())
}

const convertHerfData = (text: string): string => {
  const idAttriReg = /id::\s+[\w-]+/ig
  text = text.replace(idAttriReg, '')

  const hredReg = /(?<!!)\[(.*?)\]\((.*?)\)/ig
  return '<p>' + text.replace(hredReg, `<a href=$2>$1</a>`) + '</p>'
}

export const getMilestones = (content: BlockEntity) => {
  const milestones = content?.children
    ?.find(item => (item as BlockEntity)?.content === 'milestones')
  return (milestones ? (milestones as BlockEntity)?.children : content?.children)?.map(milestone => {
    const content = (milestone as BlockEntity)?.content
    return {
      content: removeDateFromText(content),
      date: getDateFromText(content),
    }
  })
}

export const getBlockContent = async (uuid: string, options?: { includeChildren: boolean }) => {
  if (import.meta.env.DEV) return mockData
  return logseq.Editor.getBlock(uuid, options)
}

export const getPluginConfig = () => {
  if (import.meta.env.DEV) return { disabled: false, dateFormatter: 'YYYY-MM-DD ddd' }
  return logseq.settings
}

export async function findDays(pageName: string) {
  const days = new Map()
  const result: { content: string; date: Moment }[] = []
  const block = await logseq.Editor.getPage(pageName)
  let journals
  try {
    journals = (
      await logseq.DB.datascriptQuery(
        `[:find (pull ?j [:block/journal-day]) (pull ?b [:block/content])
        :in $ ?uuid
        :where
        [?t :block/uuid ?uuid]
        [?b :block/refs ?t]
        [?b :block/page ?j]
        ]`,
        // [?j :block/journal? true]
        // @ts-ignore
        `#uuid "${block.uuid}"`,
      )
    ).map(([journal, block]) => ({ ...journal, ...block }))
  } catch (err) {
    console.error(err)
    return
  }

  for (const journal of journals) {
    if (journal["journal-day"]) {
      // @ts-ignore
      const date = new Date(...convertDayNumber(journal["journal-day"]))
      const ts = date.getTime()
      if (!days.has(ts)) {
        days.set(ts, { uuid: journal.uuid })
        // @ts-ignore
        result.push({
          content: removeDateFromText(journal.content, pageName),
          date: moment(date),
        })
      }
    } else {
      // @ts-ignore 
      result.push({
        content: removeDateFromText(journal.content, pageName),
        date: getDateFromText(journal.content),
      })
    }
  }
  return result
}

export function convertDayNumber(dayNum) {
  const year = (dayNum / 10000) >> 0
  const month = (((dayNum - year * 10000) / 100) >> 0) - 1
  const day = dayNum - year * 10000 - (month + 1) * 100
  return [year, month, day]
}