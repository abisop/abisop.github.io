import{_ as s,c as o,al as n,o as t}from"./chunks/framework.NFAqBSgQ.js";const l=JSON.parse('{"title":"psmq Publish Subscribe Message Queue","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/system/psmq/index.md","filePath":"en/applications/system/psmq/index.md"}'),a={name:"en/applications/system/psmq/index.md"};function p(c,e,r,i,d,m){return t(),o("div",null,e[0]||(e[0]=[n(`<h1 id="psmq-publish-subscribe-message-queue" tabindex="-1"><code>psmq</code> Publish Subscribe Message Queue <a class="header-anchor" href="#psmq-publish-subscribe-message-queue" aria-label="Permalink to &quot;\`psmq\` Publish Subscribe Message Queue&quot;">​</a></h1><p><code>psmq</code> is publish subscribe message queue. It&#39;s a set of programs and libraries to implement publish/subscribe way of inter-process communication on top of POSIX message queue.</p><p>Manuals, source code and more info at: <a href="https://psmq.bofc.pl" target="_blank" rel="noreferrer">https://psmq.bofc.pl</a></p><p>Little demo using <code>psmqd</code> broker, <code>psmq_pub</code> and <code>psmq_sub</code>:</p><p>Start broker and make it log to file:</p><pre><code>nsh&gt; psmqd -b/brok -p/sd/psmqd/psmqd.log &amp;
</code></pre><p>Start subscribe thread that will read all messages send on <code>/can/*</code> and <code>/adc/*</code> topic, and dump all readings to file:</p><pre><code>nsh&gt; psmq_sub -n/sub -b/brok -t/can/* -t/adc/* -o/sd/psmq-sub/can.log &amp;
n/connected to broker /brok
n/subscribed to: /can/*
n/subscribed to: /adc/*
n/start receiving data
n/reply timeout set 100
</code></pre><p>Publish some messages:</p><pre><code>nsh&gt; psmq_pub -b/brok -t/can/engine/rpm -m50
nsh&gt; psmq_pub -b/brok -t/adc/volt -m30
nsh&gt; psmq_pub -b/brok -t/can/room/10/temp -m23
nsh&gt; psmq_pub -b/brok -t/pwm/fan1/speed -m300
</code></pre><p>Check out subscribe thread logs:</p><pre><code>nsh&gt; cat /sd/psmq-sub/can.log

[2021-05-23 17:53:59] p:0 l:   3  /can/engine/rpm  50
[2021-05-23 17:53:59] p:0 l:   3  /adc/volt  30
[2021-05-23 17:53:59] p:0 l:   3  /can/room/10/temp  23
</code></pre><p>As you can see <code>/pwm/fan1/speed</code> hasn&#39;t been received by subscribe thread, since we didn&#39;t subscribe to it.</p><p>Content:</p><ul><li><code>psmqd</code> -- broker, relays messages between clients.</li><li><code>psmq_sub</code> -- listens to specified topics, can be used as logger for communication (optional).</li><li><code>psmq_pub</code> -- publishes messages directly from shell. Can send binary data, but requires pipes, so on nuttx it can only send ASCII.</li><li><code>libpsmq</code> -- library used to communicate with the broker and send/receive messages.</li></ul>`,15)]))}const u=s(a,[["render",p]]);export{l as __pageData,u as default};
