首次安装后需要重载窗口，按Ctrl+Shift+P，输入reload回车
后续若发现插件失效也可以重载窗口

功能：

1. 鼠标悬浮预览翻译结果，如$.i18n.prop("xxx")，鼠标放在xxx上可以显示key=value（中文）
2. 批量替换，需要依赖batchReplace.js文件，可以对文件或文件夹进行批量替换。在文件内点击右键，有【翻译】这个选项，文件夹同理。中文将被替换成message_zh_CN.txt中已有中文的$.i18n.prop形式
3. 批量翻译替换，batchReplace.js提供了needTranslate参数，开启该参数后，在批量替换过程中若中文在message_zh_CN.txt中不存在，则会调用192.168.1.164:3000/translate接口，接口提供了谷歌翻译API接口，并且将结果写入message_zh_CN.txt与message_en_US.txt，最后替换掉所有中文

注意事项：
可能部分存在替换失误，例如替换结果为

```javascript
content:  `<div>{{ $.i18n.prop('xxx') }}</div>`
```

因此批量替换/翻译后需要进行检查