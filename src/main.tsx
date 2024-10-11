import "@logseq/libs"
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './timeline'

const isDevelopment = import.meta.env.DEV
const PREFIX = "milestone"
const PLUGIN_ID = "logseq-plugin-milestone"
let updateMap = new Map<string, number>()

if (isDevelopment) {
  const uuid = '61daca0c-a239-4020-9772-52ca93f6dac9'
  updateMap.set(uuid, 1)
  renderApp(updateMap.get(uuid) || 0, uuid)
} else {
  console.log('[faiz:] === logseq-plugin-milestone loaded')
  logseq.ready(() => {
    logseq.Editor.registerSlashCommand('milestone', async () => {
      const block = await logseq.Editor.getCurrentBlock()
      if (!block?.uuid) return

      logseq.Editor.insertAtEditingCursor(`{{renderer milestone-${block.uuid}}}`)
    })
    logseq.Editor.registerSlashCommand('milestones-page', async () => {
      const block = await logseq.Editor.getCurrentBlock()
      if (!block?.uuid) return

      logseq.Editor.insertAtEditingCursor(`{{renderer :milestones, *}}`)
    })
    logseq.Editor.registerSlashCommand('milestones-all', async () => {
      const block = await logseq.Editor.getCurrentBlock()
      if (!block?.uuid) return

      logseq.Editor.insertAtEditingCursor(`{{renderer milestone-${block.uuid}, *}}`)
    })

    logseq.setMainUIInlineStyle({
      position: 'fixed',
      zIndex: 11,
    })
    logseq.provideModel({
      show(e) {
        const uuid = e?.dataset?.faizUuid
        const page = e?.dataset?.faizPage
        renderApp(updateMap.get(uuid) || 0, uuid, page)
        logseq.showMainUI()
      },
    })
    // logseq.on('ui:visible:changed', (e) => {
    //   if (!e.visible) {
    //     // ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    //   }
    // })

    // TODO: performance optimize
    logseq.App.onMacroRendererSlotted(async ({ slot, payload: { arguments: args, uuid } }) => {
      const old = updateMap.get(uuid)
      updateMap.set(uuid, old ? old + 1 : 1)
      // logseq.provideStyle(`#${slot}, #${PREFIX}-${slot}-${PLUGIN_ID} {display: flex;} #${PREFIX}-${slot}-${PLUGIN_ID} {flex: 1;}`)
      if (/^milestone/.test(args?.[0])) {
        let pageName = args[1]?.trim()
        if (pageName === '*') {
          pageName = (await logseq.Editor.getCurrentPage())?.originalName
          logseq.provideUI({
            key: 'milestone-v3',
            slot,
            reset: true,
            template: `<a style="color: var(--ls-link-ref-text-color);" data-on-click="show" data-faiz-uuid="${uuid}" data-faiz-page="${pageName}">show calender view</a>`,
          })
          return
        }

        logseq.provideUI({
          key: 'milestone',
          slot,
          reset: true,
          template: `<a style="color: var(--ls-link-ref-text-color);" data-on-click="show" data-faiz-uuid="${uuid}">show calender view</a>`,
        })
      }


      if (args?.[0].trim() === ':milestones') {
        let pageName = args[1]?.trim()
        if (pageName === '*') {
          pageName = (await logseq.Editor.getCurrentPage())?.originalName
        }
        if (pageName.startsWith('[[')) {
          pageName = pageName.substring(2, pageName.length - 2)
        }
        if (pageName.startsWith('#')) {
          pageName = pageName.substring(1)
        }

        logseq.provideUI({
          key: 'milestone-v2',
          slot,
          reset: true,
          template: `<a style="color: var(--ls-link-ref-text-color);" data-on-click="show" data-faiz-page="${pageName}">show calender view</a>`,
        })
      }
    })
  })
}

function renderApp(forceUpdate: number, uuid?: string, page?: string) {
  ReactDOM.render(
    <React.StrictMode>
      <App uuid={uuid} pageName={page} forceUpdate={forceUpdate} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}
