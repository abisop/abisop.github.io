import{_ as a,c as t,al as n,o as i}from"./chunks/framework.NFAqBSgQ.js";const m=JSON.parse('{"title":"Commands","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/wireless/wapi/commands.md","filePath":"en/applications/wireless/wapi/commands.md"}'),o={name:"en/applications/wireless/wapi/commands.md"};function s(l,e,d,r,p,_){return i(),t("div",null,e[0]||(e[0]=[n(`<h1 id="commands" tabindex="-1">Commands <a class="header-anchor" href="#commands" aria-label="Permalink to &quot;Commands&quot;">​</a></h1><p>This page shows <code>wapi</code> commands, their arguments and outputs. For a complete list of <code>wapi</code> commands available to the system, just run <code>wapi</code>:</p><pre><code>nsh&gt; wapi
Usage:
        wapi show         &lt;ifname&gt;
        wapi scan         &lt;ifname&gt;
        wapi scan_results &lt;ifname&gt;
        wapi ip           &lt;ifname&gt; &lt;IP address&gt;
        wapi mask         &lt;ifname&gt; &lt;mask&gt;
        wapi freq         &lt;ifname&gt; &lt;frequency&gt;  &lt;index/flag&gt;
        wapi essid        &lt;ifname&gt; &lt;essid&gt;      &lt;index/flag&gt;
        wapi psk          &lt;ifname&gt; &lt;passphrase&gt; &lt;index/flag&gt; &lt;wpa&gt;
        wapi disconnect   &lt;ifname&gt;
        wapi mode         &lt;ifname&gt;              &lt;index/mode&gt;
        wapi ap           &lt;ifname&gt;              &lt;MAC address&gt;
        wapi bitrate      &lt;ifname&gt; &lt;bitrate&gt;    &lt;index/flag&gt;
        wapi txpower      &lt;ifname&gt; &lt;txpower&gt;    &lt;index/flag&gt;
        wapi country      &lt;ifname&gt; &lt;country code&gt;
        wapi sense        &lt;ifname&gt;
        wapi pta_prio     &lt;ifname&gt;  &lt;index/flag&gt;
        wapi help

Frequency Flags:
        [0] WAPI_FREQ_AUTO
        [1] WAPI_FREQ_FIXED

ESSID Flags:
        [0] WAPI_ESSID_OFF
        [1] WAPI_ESSID_ON

Passphrase algorithm Flags:
        [0] WPA_ALG_NONE
        [1] WPA_ALG_WEP
        [2] WPA_ALG_TKIP
        [3] WPA_ALG_CCMP

Passphrase WPA version:
        [0] WPA_VER_NONE
        [1] WPA_VER_1
        [2] WPA_VER_2
        [3] WPA_VER_3

Operating Modes:
        [0] WAPI_MODE_AUTO
        [1] WAPI_MODE_ADHOC
        [2] WAPI_MODE_MANAGED
        [3] WAPI_MODE_MASTER
        [4] WAPI_MODE_REPEAT
        [5] WAPI_MODE_SECOND
        [6] WAPI_MODE_MONITOR
        [7] WAPI_MODE_MESH

Bitrate Flags:
        [0] WAPI_BITRATE_AUTO
        [1] WAPI_BITRATE_FIXED

TX power Flags:
        [0] WAPI_TXPOWER_DBM
        [1] WAPI_TXPOWER_MWATT
        [2] WAPI_TXPOWER_RELATIVE

pta prio Flags:
        [0] WAPI_PTA_PRIORITY_COEX_MAXIMIZED
        [1] WAPI_PTA_PRIORITY_COEX_HIGH
        [2] WAPI_PTA_PRIORITY_BALANCED
        [3] WAPI_PTA_PRIORITY_WLAN_HIGHD
        [4] WAPI_PTA_PRIORITY_WLAN_MAXIMIZED
</code></pre><h2 id="arguments" tabindex="-1">Arguments <a class="header-anchor" href="#arguments" aria-label="Permalink to &quot;Arguments&quot;">​</a></h2><p>Command&#39;s arguments are available on <code>wapi</code>&#39;s usage helper.</p><p>Note</p><p><code>&lt;&gt;</code> means a required argument and <code>[]</code> an optional one.</p><p>A short explanation of them follows:</p><h3 id="ifname" tabindex="-1"><code>&lt;ifname&gt;</code> <a class="header-anchor" href="#ifname" aria-label="Permalink to &quot;\`&lt;ifname&gt;\`&quot;">​</a></h3><p>The interface name is arch-dependent and it&#39;s usually set for a specific operating mode. For instance, <code>wlan0</code> would be an interface used for STA mode and <code>wlan1</code> for SoftAP.</p><p>Please refer to the [[Supported Platform](\`Supported Platform.md)s &lt;/platforms/index&gt;]{.title-ref} for platform-specific definitions. As an example, please check <code>ESP32 Wi-Fi Station Mode &lt;esp32_wi-fi_sta&gt;</code>{.interpreted-text role=&quot;ref&quot;} and <code>ESP32 Wi-Fi SoftAP Mode &lt;esp32_wi-fi_softap&gt;</code>{.interpreted-text role=&quot;ref&quot;} Wi-Fi sections.</p><h3 id="index-flag" tabindex="-1"><code>&lt;index/flag&gt;</code> <a class="header-anchor" href="#index-flag" aria-label="Permalink to &quot;\`&lt;index/flag&gt;\`&quot;">​</a></h3><p>The <code>&lt;index/flag&gt;</code> can be used as a numerical or textual value. For instance, considering the <code>wapi psk</code> command, one could use indistinctly:</p><pre><code>nsh&gt; wapi psk wlan0 mypasswd 3
nsh&gt; wapi psk wlan0 mypasswd WPA_ALG_CCMP
</code></pre>`,14)]))}const g=a(o,[["render",s]]);export{m as __pageData,g as default};
