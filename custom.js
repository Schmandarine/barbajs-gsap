document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM elements loaded");
  const appWrapper = document.querySelector('[data-barba="wrapper"]');
  const animateElm = document.querySelector("#animate");

  window.addEventListener("load", (event) => {
    gsap.registerPlugin(Flip);
    console.log("dependencies loaded");

    const animationEnter = (container) => {
      appWrapper.classList.remove("full-screen");
      return gsap.from(container, {
        autoAlpha: 0,
        duration: 1,
        clearProps: "all",
        ease: "none",
      });
    };
    const animationLeave = (data) => {
      const flipState = Flip.getState(animateElm, {
        props: "backgroundColor,color",
      });
      appWrapper.classList.add("full-screen");

      Flip.from(flipState, {
        duration: 2,
        ease: "power1.inOut",
      });

      return gsap.to(data.current.container, {
        autoAlpha: 0,
        duration: 1,
        clearProps: "all",
        ease: "none",
        delay: 2,
      });
    };

    barba.init({
      transitions: [
        {
          async leave(data) {
            animateElm.style.zIndex = "999";
            await animationLeave(data);
          },
          enter({ next }) {
            console.log("entering");
            animationEnter(next.container);
          },
        },
      ],
    });

    document.querySelector(".trigger").addEventListener("click", function (e) {
      const state = Flip.getState(document.querySelector(".animate"), {
        props: "backgroundColor,color",
      });

      Flip.fit(".animate", ".whole-page", {
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => console.log("done!"),
      });

      //document.querySelector(".new-container").classList.toggle("flipped");

      /*       Flip.from(state, {
        duration: 1,
        ease: "power1.inOut",
        absoluteOnLeave: true,
        spin: true,
        zIndex: 9999,
        onComplete: () => {
          console.log("done");
        },
      }); */
    });
  });
});
