import{_ as o,c as t,al as s,o as a}from"./chunks/framework.NFAqBSgQ.js";const g=JSON.parse('{"title":"Custom Boards How-To","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/customboards.md","filePath":"en/guides/customboards.md"}'),n={name:"en/guides/customboards.md"};function i(r,e,d,c,p,l){return a(),t("div",null,e[0]||(e[0]=[s(`<h1 id="custom-boards-how-to" tabindex="-1">Custom Boards How-To <a class="header-anchor" href="#custom-boards-how-to" aria-label="Permalink to &quot;Custom Boards How-To&quot;">​</a></h1><p>As explained in [[../quick](]{.title-ref}../quick.md)start/configuring\`, supported boards (also known as &quot;in-tree&quot; boards) are configured using a standard syntax:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cd nuttx</span></span>
<span class="line"><span> ./tools/configure.sh -l board-name:config-name</span></span>
<span class="line"><span>  Copy files</span></span>
<span class="line"><span>  Select CONFIG_HOST_LINUX=y</span></span>
<span class="line"><span>  Refreshing...</span></span></code></pre></div></blockquote><p>Sometimes it is not appropriate, or not wanted, to add a new or custom board to the NuttX boards tree itself. If so, the board can be defined out-of-tree in a custom directory and still be built easily.</p><h2 id="add-a-custom-board" tabindex="-1">Add a Custom Board <a class="header-anchor" href="#add-a-custom-board" aria-label="Permalink to &quot;Add a Custom Board&quot;">​</a></h2><p>The same set of files as provided for in-tree boards is required (i.e. configs, Kconfig, scripts, etc.) but these can be placed in a directory of your choice.</p><p>In this example, the files are assumed to exist in:</p><p>: <code>../nuttx/CustomBoards/MyCustomBoardName</code></p><pre><code>&gt; \`\`\` {.console}
&gt; pwd
&gt; /home/nuttx/nuttx
&gt;  ls -1 ../CustomBoards/MyCustomBoardName
&gt; configs
&gt; helpers
&gt; include
&gt; Kconfig
&gt; scripts
&gt;  ls ../CustomBoards/MyCustomBoardName/configs
&gt; nsh
&gt; MyCustomConfig
&gt; 
&gt; \`\`\`
</code></pre><p>To build the custom board, the syntax is slightly different to in-tree boards and configs:</p><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> ./tools/configure.sh -l ../CustomBoards/MyCustomBoardName/configs/MyCustomConfig</span></span>
<span class="line"><span>Copy files</span></span>
<span class="line"><span>Select CONFIG_HOST_LINUX=y</span></span>
<span class="line"><span>Refreshing...</span></span></code></pre></div></blockquote><h2 id="kconfig-settings" tabindex="-1">Kconfig Settings <a class="header-anchor" href="#kconfig-settings" aria-label="Permalink to &quot;Kconfig Settings&quot;">​</a></h2><p>Once the board is configured, to ensure subsequent builds run correctly, there are two Kconfig settings that need to be set. These are:</p><p><code>Board Selection --&gt; Custom Board Configuration --&gt; Custom Board Name</code>{.interpreted-text role=&quot;menuselection&quot;}</p><p><code>Board Selection --&gt; Custom Board Configuration --&gt; Relative custom board directory</code>{.interpreted-text role=&quot;menuselection&quot;}</p><p>They should be set to suit your board name and directory location.</p><p>Note</p><p>If you subsequently run a <code>make distclean</code> operation, then these settings will be lost. They should be added back before building, and/or before running <code>make menuconfig</code>.</p>`,18)]))}const m=o(n,[["render",i]]);export{g as __pageData,m as default};
