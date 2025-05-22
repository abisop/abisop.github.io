import{_ as o,c as t,al as a,o as i}from"./chunks/framework.NFAqBSgQ.js";const f=JSON.parse('{"title":"nxcodec NxCodec video codec test application","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/system/nxcodec/index.md","filePath":"en/applications/system/nxcodec/index.md"}'),c={name:"en/applications/system/nxcodec/index.md"};function n(s,e,d,r,p,l){return i(),t("div",null,e[0]||(e[0]=[a(`<h1 id="nxcodec-nxcodec-video-codec-test-application" tabindex="-1"><code>nxcodec</code> NxCodec video codec test application <a class="header-anchor" href="#nxcodec-nxcodec-video-codec-test-application" aria-label="Permalink to &quot;\`nxcodec\` NxCodec video codec test application&quot;">​</a></h1><p>This application is a command-line tool that verifies the functionality of NuttX codecs. Specifically, it serves as a verification tool for v4l2m2m.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>This page shows nxcodec options, For a complete list of nxcodec options just run <code>nxcodec -h</code>:</p><pre><code>ap&gt; nxcodec -h
NxCodec Version: 1.00
Usage: nxcodec -d devname -s [wxh] -f [informt] -i infile -f [outformat] -o outfile
Default settings for decoder parameters

[-d | --device]  Video device name
[-s | --size]    Size of stream
[-h | --help]    Print this message
[-f | --format]  Format of stream
[-i | --infile]  Input filename for M2M devices
[-o | --outfile] Outputs stream to filename
</code></pre><p>By default, it is the decoding mode, with a default parameter size of 640x480, input format of H264, and output format of YUV420. The <code>-i</code> parameter corresponds to the input parameter before it, and the <code>-i</code> parameter corresponds to the output parameter after it.</p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><p>Decode an H264 stream file into a yuv420 file:</p><pre><code>mount -t hostfs -o fs=/path/from/ /stream
nxcodec -d /dev/video1 -s 256x144 -i /stream/256x144.h264 -o /stream/256x144-yuv420p.yuv
</code></pre><p>Encode a yuv420 file as an h264 stream file:</p><pre><code>mount -t hostfs -o fs=/path/from/ /stream
nxcodec -d /dev/video2 -s 256x144 -f YU12 -i /stream/256x144-yuv420p.yuv -f H264 -o /stream/256x144.h264
</code></pre><p>Author: ZhengHui SHI Date: 9 July 2024</p>`,12)]))}const h=o(c,[["render",n]]);export{f as __pageData,h as default};
