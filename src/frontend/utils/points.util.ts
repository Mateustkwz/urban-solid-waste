type LevelInfo = {
  level: string;
  nextLevel: string | null;
  nextTarget: number | null;
};

const getEcoLevel = (points: number): LevelInfo => {
  if (points < 100)
    return { level: "Eco Semente", nextLevel: "Eco Broto", nextTarget: 100 };
  if (points < 200)
    return { level: "Eco Broto", nextLevel: "Eco Folha", nextTarget: 200 };
  if (points < 300)
    return { level: "Eco Folha", nextLevel: "Eco Galho", nextTarget: 300 };
  if (points < 400)
    return { level: "Eco Galho", nextLevel: "Eco Árvore", nextTarget: 400 };
  if (points < 500)
    return {
      level: "Eco Árvore",
      nextLevel: "Eco Floresta",
      nextTarget: 500,
    };
  if (points < 700)
    return {
      level: "Eco Floresta",
      nextLevel: "Eco Montanha",
      nextTarget: 700,
    };
  if (points < 900)
    return { level: "Eco Montanha", nextLevel: "Eco Rio", nextTarget: 900 };
  if (points < 1100)
    return { level: "Eco Rio", nextLevel: "Eco Oceano", nextTarget: 1100 };
  if (points < 1400)
    return {
      level: "Eco Oceano",
      nextLevel: "Eco Planeta",
      nextTarget: 1400,
    };
  if (points < 1700)
    return {
      level: "Eco Planeta",
      nextLevel: "Eco Galáxia",
      nextTarget: 1700,
    };
  if (points < 2000)
    return {
      level: "Eco Galáxia",
      nextLevel: "Eco Universo",
      nextTarget: 2000,
    };
  return { level: "Eco Universo", nextLevel: null, nextTarget: null };
};

export { getEcoLevel };
