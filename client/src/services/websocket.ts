import { useEffect } from "react";

const webSocketUrl = `wss://k8c208.p.ssafy.io:8080`;
const ws = new WebSocket(webSocketUrl);

useEffect(() => {
  // 첫 연결시 orderList 요청
  ws.onopen = () => {
    console.log("CONNECT");
    ws.send("getOrderList");
  };

  // 받아온 orderList items에 저장
  ws.onmessage = (e) => {
    // const data = JSON.parse(e.data);
    // if (Array.isArray(data)) {
    //   data.map((V) => {
    //     if (user?.name === V.name) {
    //       setCheck(true);
    //     }
    //   });
    //   setItems(data);
    // }
  };

  return () => {
    // 브라우저가 종료될 때 WebSocket 연결 해제
    if (ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  };
}, []);

ws.onmessage = (e) => {
  //   const data = JSON.parse(e.data);
  //   setItems((prev) => data);
};

const send = () => {
  //   if (sendData.from === sendData.to) {
  //     toast.error("서로 다른 위치를 선택해주세요!", toastOptions);
  //     return;
  //   } else if (sendData.record === null) {
  //     ws.send(JSON.stringify(sendData));
  //   } else {
  //     ws.send(JSON.stringify(sendData));
  //     ws.send(sendData.record);
  //   }
};

const removeData = () => {
  //   ws.send(JSON.stringify({ action: "removeData", name: user.name }));
};
