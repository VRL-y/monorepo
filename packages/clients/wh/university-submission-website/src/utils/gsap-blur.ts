import { gsap } from "gsap";

const blurProperty = gsap.utils.checkPrefix("filter");
const blurExp = /blur\((.+)?px\)/;

const getBlurMatch = (target: HTMLElement): RegExpMatchArray =>
  (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];

export const BlurPlugin = {
  name: "blur",
  get(target: HTMLElement) {
    return +getBlurMatch(target)[1] || 0;
  },
  init(target: HTMLElement, endValue: number) {
    let filter = gsap.getProperty(target, blurProperty) as string;
    const endBlur = `blur(${endValue}px)`;
    const match = getBlurMatch(target)[0];
    let index: number;

    if (filter === "none") {
      filter = "";
    }
    if (match) {
      index = filter.indexOf(match);
      endValue =
        filter.substr(0, index) + endBlur + filter.substr(index + match.length);
    } else {
      endValue = filter + endBlur;
      filter += filter ? " blur(0px)" : "blur(0px)";
    }
    this.target = target;
    this.interp = gsap.utils.interpolate(filter, endValue);
  },
  render(progress: number, data: any) {
    data.target.style[blurProperty] = data.interp(progress);
  },
};
