import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user'
import moment, { Moment } from 'moment'

import mockData from './mockData'
import { text } from 'stream/consumers'

const getDateFromText = (text: string): Moment => {
  const last = text?.match(/\[\[(.+?)\]\]/g)?.slice(-1)[0]
  return moment(last?.replaceAll(/^(\[\[)|(\]\])$/g, ''), getPluginConfig()?.dateFormatter)
}

const removeDateFromText = (text: string): string => {
  const last = text?.match(/\[\[(.+?)\]\]/g)?.slice(-1)[0]
  if (!last) return convertHerfData(text)
  return convertHerfData(text.replace(last, '').trim())
}

const convertHerfData = (text: string): string => {
  const idAttriReg = /id::\s+[\w-]+/ig
  text = text.replace(idAttriReg,'')

  const hredReg = /(?<!!)\[(.*?)\]\((.*?)\)/ig
  return '<p>'+text.replace(hredReg, `<a href=$2>$1</a>`)+'</p>'
}

export const getMilestones = (content: BlockEntity) => {
  const milestones = content?.children
    ?.find(item => (item as BlockEntity)?.content === 'milestones')
  return (milestones as BlockEntity)?.children?.map(milestone => {
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