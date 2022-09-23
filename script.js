async function sendContact(ev) {
    ev.preventDefault();

    const senderEmail = document
      .getElementById('emailInput').value;
    const senderMessage = document
      .getElementById('messageInput').value;

    const webhookBody = {
      embeds: [{
        title: 'feedback',
        fields: [
          { name: 'Sennder', value: senderEmail },
          { name: 'Meling', value: senderMessage }
        ]
      }],
    };

    const webhookUrl = 'https://discord.com/api/webhooks/1021323340096471082/8q7T0KvytjoSM2IHYnSU8bVj1MxrjvRoAx_3klahN2h8uH4V1ctqZqPRhA8F76lhFBin';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookBody),
    });

    if (response.ok) {
      alert('Vi har motatt melingen din');
    } else {
      alert('Det opso en error, du må fylle ut alle boxene. om dette ikke funker må du skrive mindre eller prøve igjen senere.');
    }
  }