export default function swDev() {
  // let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker
    .register("/FarAway-Packing_List_Planner/sw.js", {
      scope: "/FarAway-Packing_List_Planner/",
    })
    .then((response) => {
      console.warn("response", response);
    });
}
