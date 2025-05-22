import{_ as a,c as n,al as t,o as s}from"./chunks/framework.NFAqBSgQ.js";const E=JSON.parse('{"title":"camera Camera Snapshot","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/examples/camera/index.md","filePath":"en/applications/examples/camera/index.md"}'),i={name:"en/applications/examples/camera/index.md"};function r(o,e,c,p,m,d){return s(),n("div",null,e[0]||(e[0]=[t(`<h1 id="camera-camera-snapshot" tabindex="-1"><code>camera</code> Camera Snapshot <a class="header-anchor" href="#camera-camera-snapshot" aria-label="Permalink to &quot;\`camera\` Camera Snapshot&quot;">​</a></h1><p>This sample is implemented as <code>camera</code> command on NuttX Shell. The synopsis of the command is as below.:</p><pre><code>nsh&gt; camera ([-jpg]) ([capture num])

-jpg        : this option is set for storing JPEG file into a strage.
            : If this option isn&#39;t set capturing raw RGB565 data in a file.
            : raw RGB565 is default.

capture num : this option instructs number of taking pictures.
            : 10 is default.
</code></pre><p>Storage will be selected automatically based on the available storage option.</p><p>Execution example:</p><pre><code>nsh&gt; camera
nximage_listener: Connected
nximage_initialize: Screen resolution (320,240)
Take 10 pictures as RGB file in /mnt/sd0 after 5 seconds.
After finishing taking pictures, this app will be finished after 10 seconds.
Expier time is pasted.
Start capturing...
FILENAME:/mnt/sd0/VIDEO001.RGB
FILENAME:/mnt/sd0/VIDEO002.RGB
FILENAME:/mnt/sd0/VIDEO003.RGB
FILENAME:/mnt/sd0/VIDEO004.RGB
FILENAME:/mnt/sd0/VIDEO005.RGB
FILENAME:/mnt/sd0/VIDEO006.RGB
FILENAME:/mnt/sd0/VIDEO007.RGB
FILENAME:/mnt/sd0/VIDEO008.RGB
FILENAME:/mnt/sd0/VIDEO009.RGB
FILENAME:/mnt/sd0/VIDEO010.RGB
Finished capturing...
Expier time is pasted.
nximage_listener: Lost server connection: 117
</code></pre>`,6)]))}const h=a(i,[["render",r]]);export{E as __pageData,h as default};
