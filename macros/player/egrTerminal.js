const text = `<span style="color: #00cc00;">TacNet Info:</span> note possible <span style="color: #cc0000;">enemy sensor coverage</span> EGR_2.71828 could run scan if requested.`;

ChatMessage.create({
    content: `
        <div style="width: fit-content; font-size: smaller; font-family: Courier New, monospace; text-align: left; background-color: black;">/&gt; ${text}</div>
    `
})