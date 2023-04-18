document.addEventListener("DOMContentLoaded", function (event) {
  const appWrapper = document.querySelector('[data-barba="wrapper"]');

  window.addEventListener("load", (event) => {
    gsap.registerPlugin(Flip);

    const animationEnter = (container) => {
      return gsap.from(container, {
        autoAlpha: 0.4,
        duration: 1,
        clearProps: "all",
        ease: "none",
        delay: 3,
      });
    };
    const animationLeave = async (data) => {
      console.log(!data.trigger.classList.contains("mainnav"));

      if (!data.trigger.classList.contains("mainnav")) {
        const parentCard = await fixJump(data.trigger);
        console.log("after the promise");

        parentCard.style.zIndex = "999";
        const flipState = Flip.getState(parentCard, {
          props: "backgroundColor,color",
        });

        for (const className in transitionsMap) {
          if (data.trigger.classList.contains(className)) {
            transitionsMap[className](data, parentCard);
          }
        }

        Flip.from(flipState, {
          duration: 0.3,
          delay: 0,
          ease: "power1.inOut",
        });
      }

      return gsap.to(data.current.container, {
        autoAlpha: 0,
        duration: 2,
        clearProps: "all",
        ease: "none",
        delay: 1,
      });
    };
    const fixJump = (trigger) => {
      return new Promise((resolve, reject) => {
        console.log("start promise");
        const parent = trigger.closest(".card");
        gsap.set(parent.parentNode, {
          height: gsap.getProperty(parent, "height"),
        });
        setTimeout(() => resolve(parent), 1000);
      });
    };

    const transitionsMap = {
      link1: function (data, parentCard) {
        parentCard.classList.add("animateFirst");
      },
      link2: function (data, parentCard) {
        parentCard.classList.add("animateSecond");
      },
    };

    barba.init({
      transitions: [
        {
          async leave(data) {
            console.log("start leaving");
            await animationLeave(data);
            console.log("end leaving");
          },
          enter({ next }) {
            console.log("entering");
            animationEnter(next.container);
          },
        },
      ],
    });
  });
});
