import { BadgeDollarSign, Bike, Brain, Candy, Check, Clapperboard, Coffee, CupSoda, Flame, Gamepad2, Gem, HeartHandshake, Home, Medal, MoonStar, Mountain, Music2, Pizza, Search, ShieldCheck, ShoppingBag, Sparkles, Star, Sunrise, TabletSmartphone, Target, Trees, Trophy, Utensils, UtensilsCrossed, Zap } from "lucide-react";

export const icons = { BadgeDollarSign, Bike, Brain, Candy, Check, Clapperboard, Coffee, CupSoda, Flame, Gamepad2, Gem, HeartHandshake, Home, Medal, MoonStar, Mountain, Music2, Pizza, Search, ShieldCheck, ShoppingBag, Sparkles, Star, Sunrise, TabletSmartphone, Target, Trees, Trophy, Utensils, UtensilsCrossed, Zap };

export function Icon({ name, size = 20, strokeWidth = 2.3 }) {
  const Component = icons[name] || Star;
  return <Component size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
