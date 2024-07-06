import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default defineNuxtPlugin(() => {
  window.Pusher = Pusher
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '2b2aff8672ae016edbb0',
    cluster:'ap1',
    encrypted: true,
  })
})

// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// export default ({ app }) => {
//     window.Echo = new Echo({
//         broadcaster: 'pusher',
//         key: process.env.PUSHER_APP_KEY,
//         cluster: process.env.PUSHER_APP_CLUSTER,
//         encrypted: true,
//     });
// };

// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// export default ({ app }, inject) => {
//   console.log(process.env.PUSHER_APP_KEY);
//   console.log(process.env.PUSHER_APP_CLUSTER);
//   window.Pusher = Pusher;

//   const echo = new Echo({
//     broadcaster: "pusher",
//     key: process.env.PUSHER_APP_KEY,
//     cluster: process.env.PUSHER_APP_CLUSTER,
//     encrypted: true,
//   });

//   inject("echo", echo);
// };
