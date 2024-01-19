# postmaster toolsのtrafficStatsを毎朝9時にSlackに通知してくれる君
ここと
https://github.com/uewtwo/reportPostmasterTools/blob/58df9243618eac4336ce7dc3c3a70b64a556ff7e/index.js#L6
ここを変更する
https://github.com/uewtwo/reportPostmasterTools/blob/58df9243618eac4336ce7dc3c3a70b64a556ff7e/index.js#L14

適切な権限を持っているroleのクレデンシャルをルートに`postmastertools-credentials.json`として配置して↓のコメントアウトを外すとローカルで試せる
https://github.com/uewtwo/reportPostmasterTools/blob/58df9243618eac4336ce7dc3c3a70b64a556ff7e/index.js#L12
