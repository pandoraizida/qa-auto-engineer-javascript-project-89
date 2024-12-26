const steps = [
    {
      id: 'welcome',
      messages: [
        'Hi! This is a test! Check that the message is from configuration file',
      ],
      buttons: [
        {
          text: 'Check that the button text is from configuration file',
          nextStepId: 'start',
          type: "button",
        },
        {
          text: 'New button leads to the new page',
          nextStepId: 'test',
          type: "button",
        }
      ],
    },
    {
      id: 'start',
      messages: [
        'Here are some buttons leads to different pages',
      ],
      buttons: [
        {
          text: '<script> Alert("Test") </script>',
          nextStepId: 'test',
          type: "button",
        },
        {
          text: 'leads to itself',
          nextStepId: 'start',
          type: "button",
        },
        {
          text: 'leads on nonexistent page',
          nextStepId: 'switchswitch',
          type: "button",
        },
        {
          text: 'leads to null page',
          nextStepId: null,
          type: "button",
        },
        {
          text: 'leads to number page',
          nextStepId: 123,
          type: "button",
        }
      ],
    },
    {
        id: 'test',
        messages: [
          111, null, 'Here are a lot of messages and none buttons', '<script> Alert("Test") </script>'
        ],
        buttons: [
        ],
      },
  ];
  
  export default steps;
  