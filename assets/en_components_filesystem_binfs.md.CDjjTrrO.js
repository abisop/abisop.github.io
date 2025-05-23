import{_ as t,c as l,j as n,a as s,o as i}from"./chunks/framework.NFAqBSgQ.js";const d=JSON.parse('{"title":"BINFS","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/filesystem/binfs.md","filePath":"en/components/filesystem/binfs.md"}'),o={name:"en/components/filesystem/binfs.md"};function a(f,e,r,m,c,b){return i(),l("div",null,e[0]||(e[0]=[n("h1",{id:"binfs",tabindex:"-1"},[s("BINFS "),n("a",{class:"header-anchor",href:"#binfs","aria-label":'Permalink to "BINFS"'},"​")],-1),n("p",null,'This is the binfs file system that allows "fake" execution of NSH built-in applications via the file system. The binfs fs file system can be built into the system by enabling:',-1),n("pre",null,[n("code",null,`CONFIG_BUILTIN=y
CONFIG_FS_BINFS=y
`)],-1),n("p",null,"It can then be mounted from the NSH command like like:",-1),n("pre",null,[n("code",null,`mount -t binfs /bin
`)],-1),n("p",null,"Example:",-1),n("pre",null,[n("code",null,`NuttShell (NSH) NuttX-6.31
nsh> hello
nsh: hello: command not found

nsh> mount -t binfs /bin
nsh> ls /bin
ls /bin
/bin:
 hello

nsh> /bin/hello
Hello, World!!
`)],-1)]))}const p=t(o,[["render",a]]);export{d as __pageData,p as default};
