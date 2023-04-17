document.addEventListener("DOMContentLoaded", function (event) {
  const appWrapper = document.querySelector('[data-barba="wrapper"]');

  window.addEventListener("load", (event) => {
    gsap.registerPlugin(Flip);

    const animationEnter = (container) => {
      appWrapper.classList.remove("full-screen");
      return gsap.from(container, {
        autoAlpha: 0,
        duration: 1,
        clearProps: "all",
        ease: "none",
      });
    };
    const animationLeave = async (data) => {
      const parentCard = await fixJump(data.trigger);

      parentCard.style.zIndex = "999";
      const flipState = Flip.getState(parentCard, {
        props: "backgroundColor,color",
      });

      parentCard.classList.add("animateActive");
      console.log(parentCard.classList);

      Flip.from(flipState, {
        duration: 1,
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

    const fixJump = (trigger) => {
      return new Promise((resolve, reject) => {
        console.log("duplicate DOM");
        const parent = trigger.closest(".card");
        //const clone = parent.cloneNode(true);
        //clone.classList.add("absolute");
        //parent.parentNode.appendChild(clone);
        gsap.set(parent.parentNode, {
          height: gsap.getProperty(parent, "height"),
        });
        setTimeout(resolve(parent), 2000);
      });
    };

    barba.init({
      transitions: [
        {
          async leave(data) {
            await animationLeave(data);
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
