import{_ as a,c as n,j as e,a as r,o as s}from"./chunks/framework.NFAqBSgQ.js";const f=JSON.parse('{"title":"mtd MTD test and transfer rate benchmark","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/benchmarks/mtd/index.md","filePath":"en/applications/benchmarks/mtd/index.md"}'),i={name:"en/applications/benchmarks/mtd/index.md"};function d(o,t,c,l,m,p){return s(),n("div",null,t[0]||(t[0]=[e("h1",{id:"mtd-mtd-test-and-transfer-rate-benchmark",tabindex:"-1"},[e("code",null,"mtd"),r(" MTD test and transfer rate benchmark "),e("a",{class:"header-anchor",href:"#mtd-mtd-test-and-transfer-rate-benchmark","aria-label":'Permalink to "`mtd` MTD test and transfer rate benchmark"'},"​")],-1),e("p",null,"This testing/benchmark application performs an erase/write operation to evaluate write transfer rate and then reads the written content back to evaluate the read transfer rate. Finally, it compares the read data with the previously written data to ensure the MTD device is working as expected.",-1),e("p",null,"EXAMPLE:",-1),e("pre",null,[e("code",null,`nsh> mtd /dev/mtdblock0
FLASH Test on device with:
  Sector size:        4096
  Sector count:        256
  Erase block:        4096
  Total size:      1048576

Starting write operation...

Write operation completed in 5.46 seconds
Total bytes written: 1048576
Transfer rate [write]: 187.55 KiB/s

Starting read operation...

Read operation completed in 0.11 seconds
Total bytes read: 1048576
Transfer rate [read]: 9309.09 KiB/s

Data verification successful: read data matches written data
`)],-1)]))}const u=a(i,[["render",d]]);export{f as __pageData,u as default};
