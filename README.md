# logseq-plugin-milestone
> show milestone in calendar

[![latest release version](https://img.shields.io/github/v/release/haydenull/logseq-plugin-milestone)](https://github.com/haydenull/logseq-plugin-milestone/releases)
[![License](https://img.shields.io/github/license/haydenull/logseq-plugin-milestone?color=blue)](https://github.com/haydenull/logseq-plugin-markdown-table/blob/main/LICENSE)

English | [简体中文](./README-zh_CN.md)

## Demo
![demo](./demo.gif)
![demo1](/images/image.png)
![demo1](/images/image%20copy.png)
![demo1](/images/image%20copy%202.png)


## Usage
1. Install plugin
2. Fill in the plugin configuration, **must fill in `dateFormatter`**
3. Input `/` command, select `milestone` \ `milestones-page` \ `milestones-all`
4. milestone: Enter time nodes as sub-items within the "milestones" section.
5. milestones-page: Pull information from various journals on the page to serve as milestones.
6. milestones-all: Integrate steps 4 and 5 to create a comprehensive overview of milestones.


## Plugin configuration
- dateFormatter: Refer to [moment](https://momentjs.com/docs/#/displaying/) fill in time format string, must match your notes' time format

## Configuration example
```json
{
  "dateFormatter": "YYYY-MM-DD ddd"
}