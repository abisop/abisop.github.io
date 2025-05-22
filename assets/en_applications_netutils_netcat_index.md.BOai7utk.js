import{_ as t,c as a,al as n,o as s}from"./chunks/framework.NFAqBSgQ.js";const f=JSON.parse('{"title":"netcat NetCat tool","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/netutils/netcat/index.md","filePath":"en/applications/netutils/netcat/index.md"}'),r={name:"en/applications/netutils/netcat/index.md"};function i(o,e,l,p,c,h){return s(),a("div",null,e[0]||(e[0]=[n(`<h1 id="netcat-netcat-tool" tabindex="-1"><code>netcat</code> NetCat tool <a class="header-anchor" href="#netcat-netcat-tool" aria-label="Permalink to &quot;\`netcat\` NetCat tool&quot;">​</a></h1><p>netcat TCP/IP Swiss army knife.</p><p>It was re-implemented from scratch for NuttX</p><h2 id="demo" tabindex="-1">DEMO <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;DEMO&quot;">​</a></h2><p><img src="https://files.mastodon.social/media_attachments/files/105/163/916/892/863/178/original/05468e28b4463f95.png" alt="image"></p><ul><li><a href="https://mastodon.social/@rzr/105225153152922220#weboftwins-osvehicle-2020-rzr" target="_blank" rel="noreferrer">https://mastodon.social/@rzr/105225153152922220#weboftwins-osvehicle-2020-rzr</a></li><li><a href="https://purl.org/rzr/weboftwins" target="_blank" rel="noreferrer">https://purl.org/rzr/weboftwins</a></li></ul><h2 id="usage" tabindex="-1">USAGE <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;USAGE&quot;">​</a></h2><p>Usage is straightforward:</p><pre><code>nsh&gt; help ; netcat
Usage: netcat [-l] [destination] [port] [file]

nsh&gt; renew eth0 ; ifconfig

eth0    Link encap:Ethernet HWaddr 52:13:FF:FF:FF:FF at UP
        inet addr:192.168.1.42 DRaddr:192.168.1.254 Mask:255.255.255.0
</code></pre><p>In the following examples, following configuration is used:</p><ul><li>target (nuttx) is 192.168.1.42</li><li>host (linux) is 192.168.1.55</li></ul><h3 id="server" tabindex="-1">Server <a class="header-anchor" href="#server" aria-label="Permalink to &quot;Server&quot;">​</a></h3><p>As a server on NuttX and Linux&#39;s netcat as client:</p><pre><code>nsh&gt; netcat -l

sh&gt; cat /proc/version | netcat 192.168.1.42 31337
Linux ...
</code></pre><p>Default port is 31337 but it can changed:</p><pre><code>nsh&gt; renew eth0 ; ifconfig ; netcat -l
log: net: listening on :31337
Linux ...
</code></pre><h3 id="client" tabindex="-1">Client <a class="header-anchor" href="#client" aria-label="Permalink to &quot;Client&quot;">​</a></h3><p>Start Server on GNU/Linux:</p><pre><code>sh&gt; ip addr show &amp;&amp; netcat -l 31337
</code></pre><p>Client side on nuttx, we create:</p><pre><code>nsh&gt; help ; renew eth0 ; ifconfig
nsh&gt; netcat 192.168.1.55 31337 /proc/version
</code></pre><h3 id="using-pipes" tabindex="-1">Using pipes <a class="header-anchor" href="#using-pipes" aria-label="Permalink to &quot;Using pipes&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mkfifo /dev/fifo</span></span>
<span class="line"><span>netcat 192.168.1.55 31337 /proc/fifo</span></span>
<span class="line"><span>help &gt; /dev/fifo</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fxos8700cq &gt; /dev/fifo &amp;</span></span>
<span class="line"><span>fxos8700cq [7:100]</span></span>
<span class="line"><span>netcat 192.168.1.55 31337  /dev/fifo</span></span></code></pre></div><h3 id="resources" tabindex="-1">Resources <a class="header-anchor" href="#resources" aria-label="Permalink to &quot;Resources&quot;">​</a></h3><ul><li>&lt;<a href="https://en.wikipedia.org/wiki/Netcat" target="_blank" rel="noreferrer">https://en.wikipedia.org/wiki/Netcat</a>&gt;</li><li>&lt;<a href="https://purl.org/rzr/weboftwins" target="_blank" rel="noreferrer">https://purl.org/rzr/weboftwins</a>&gt;</li><li>&lt;<a href="https://github.com/rzr/aframe-smart-home/issues/3" target="_blank" rel="noreferrer">https://github.com/rzr/aframe-smart-home/issues/3</a>&gt;</li></ul>`,25)]))}const u=t(r,[["render",i]]);export{f as __pageData,u as default};
