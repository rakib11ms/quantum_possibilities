import {AngrySvg} from "./emoji-icons/AngrySvg";
import { DislikeSvg } from "./emoji-icons/DislikeSvg";
import {HahaSvg} from "./emoji-icons/HahaSvg";
import {LikeSvg} from "./emoji-icons/LikeSvg";
import {LoveSvg} from "./emoji-icons/LoveSvg";
import {SadSvg} from "./emoji-icons/SadSvg";
import {WowSvg} from "./emoji-icons/WowSvg";

export const reactionTypeToComponent = {
  love: {component: <LoveSvg />, textClass: "reaction__text__color__love"},
  haha: {component: <HahaSvg />, textClass: "reaction__text__color__love"},
  sad: {component: <SadSvg />, textClass: "reaction__text__color__love"},
  like: {component: <LikeSvg />, textClass: "reaction__text__color__love"},
  angry: {component: <AngrySvg />, textClass: "reaction__text__color__love"},
  wow: {component: <WowSvg />, textClass: "reaction__text__color__love"},
  dislike: {component: <DislikeSvg />, textClass: "reaction__text__color__love"},
};
