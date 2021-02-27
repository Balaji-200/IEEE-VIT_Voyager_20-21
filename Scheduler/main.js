((window) => {
  let now = moment();

  // JSON DATA
  let schedule = [
    {
      date: now,
      agenda: [
        {
          range: ["February 27th 2021, 09:00 am", "March 6th 2021, 08:59 am"],
          display: { h: 6, m: "30", a: "pm", date: "3rd March" },
          desc: "Webseries quiz",
        },
        {
          range: ["March 6th 2021, 09:00 am", "March 13th 2021, 08:59 am"],
          display: { h: 4, m: "", a: "pm", date: "6th March" },
          desc: "Machine Learning Interpretation (Webinar)",
        },
        {
          range: ["March 13th 2021, 09:00 am", "March 17th 2021, 08:59 am"],
          display: { h: 4, m: "", a: "pm", date: "13th March" },
          desc: "CyberSecurity (Webinar)",
        },
        {
          range: ["March 17th 2021, 09:00 am", "March 20th 2021, 08:59 am"],
          display: { h: 6, m: "30", a: "pm", date: "17th March" },
          desc: "Wriggle Skribble",
        },
        {
          range: ["March 20th 2021, 09:00 am", "March 27th 2021, 08:59 am"],
          display: { h: 9, m: "", a: "am", date: "20th March" },
          desc: "Home Automation",
        },
        {
          range: ["March 27th 2021, 09:00 am", "March 28th 2021, 08:59 am"],
          display: { h: 10, m: "", a: "am", date: "27th March" },
          desc: "Shark Tank",
        },
        {
          range: ["March 28th 2021, 09:00 am", "April 3rd 2021, 08:59 am"],
          display: { h: 9, m: "", a: "am", date: "28th March" },
          desc: "P5.js",
        },
        {
          range: ["April 3rd 2021, 09:00 am", "April 4th 2021, 08:59 am"],
          display: { h: 2, m: "", a: "pm", date: "3rd April" },
          desc: "TYC Competition",
        },
        {
          range: ["April 4th 2021, 09:00 am", "April 5th 2021, 00:00 am"],
          display: { h: 2, m: "", a: "pm", date: "4th April" },
          desc: "CodeAger",
        },
      ],
    },
  ];
  let numFromTime = (time) => {
    let ref = moment();
    let t = moment(time, "MMMM Do YYYY, hh:mm a");
    let set = time.split(/[.:]/);
    return t.diff(ref, "minutes");
  };

  let app = new Vue({
    el: "aside",
    data: {
      now: numFromTime(moment(now).format("HH:mm")),
      time: moment().format("h:mm a"),
      showTimeTraveller: false,
    },
  });

  let sked = new Vue({
    el: "main",
    filters: {
      date: function (date) {
        return date.format("ddd, MMM D");
      },
    },
    data: {
      now: numFromTime(moment(now).format("MMMM Do YYYY, hh:mm a")),
      schedule: schedule,
    },
    methods: {
      checkTime: function (ts, te) {
        return this.now >= numFromTime(ts) && this.now < numFromTime(te);
      },
    },
  });

  let setClockPos = () => {
    setTimeout(() => {
      let anchor = document.querySelector(".current");
      let t = "1em";
      if (anchor) {
        t = Math.round(anchor.getBoundingClientRect().top) + "px";
      }
      document.documentElement.style.setProperty("--y", t);
    }, 350);
  };


  let setTime = function () {
    let now = moment();
    app.now = sked.now = numFromTime(
      moment(now).format("MMMM Do YYYY, hh:mm a")
    );
    app.time = moment(now).format("hh:mm a");
  };

  let runTimer = () => {
    setClockPos();
    timeTraveler = setInterval(function () {
      setTime();
    }, 30000);
  };

  runTimer();

  let randum = function (min, max) {
    return Math.round(Math.random() * min + Math.random() * max);
  };

  let randex = function () {
    return (
      "#" +
      ("00" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6)
    );
  };

  let colorizer = () => {
    let hex = randex();
    let reverseHex = "#" + hex.replace("#", "").split("").reverse().join("");
    document.documentElement.style.setProperty("--bg", hex);
    document.documentElement.style.setProperty("--accent", reverseHex);
  };

  let transformer = () => {
    document.documentElement.style.setProperty(
      "--transform",
      "translate(-50%, -50%) rotate(" + randum(-360, 360) + "deg)"
    );
  };

  setTimeout(() => {
    colorizer();
  }, 1000);

  setTimeout(() => {
    transformer();
  }, 100);

  let adventureTime = window.setInterval(function() {
    colorizer()
  }, 7500);

  let partyTime = window.setInterval(function() {
    transformer()
  }, 12000);

  // resize capture
  let resizeTimer;
  window.addEventListener(
    "resize",
    (e) => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setClockPos();
      }, 60);
    },
    false
  );
})(window);
