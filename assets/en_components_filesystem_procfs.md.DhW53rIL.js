import{_ as t,c as s,j as n,a as o,o as r}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"PROCFS","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/filesystem/procfs.md","filePath":"en/components/filesystem/procfs.md"}'),a={name:"en/components/filesystem/procfs.md"};function l(c,e,p,i,m,f){return r(),s("div",null,e[0]||(e[0]=[n("h1",{id:"procfs",tabindex:"-1"},[o("PROCFS "),n("a",{class:"header-anchor",href:"#procfs","aria-label":'Permalink to "PROCFS"'},"​")],-1),n("p",null,"This is a tiny procfs file system that allows read-only access to a few attributes of a task or thread. This tiny procfs fs file system can be built into the system by enabling:",-1),n("pre",null,[n("code",null,`CONFIG_FS_PROCFS=y
`)],-1),n("p",null,"It can then be mounted from the NSH command like like:",-1),n("pre",null,[n("code",null,`nsh> mount -t procfs /proc
`)],-1),n("p",null,"Example:",-1),n("pre",null,[n("code",null,`NuttShell (NSH) NuttX-6.31
nsh> mount -t procfs /proc

nsh> ls /proc
/proc:
 0/
 1/

nsh> ls /proc/1
/proc/1:
 status
 cmdline

nsh> cat /proc/1/status
Name:       init
Type:       Task
State:      Running
Priority:   100
Scheduler:  SCHED_FIFO
SigMask:    00000000

nsh> cat /proc/1/cmdline
init

nsh> sleep 100 &
sleep [2:100]
nsh> ls /proc
ls /proc
/proc:
 0/
 1/
 2/

nsh> cat /proc/2/cmdline
<pthread> 0x527420
`)],-1)]))}const u=t(a,[["render",l]]);export{h as __pageData,u as default};
