// Sample data for dog's weight development
export const weights = [
    9.2, 10.03, 10.87, 11.7, 11.7, 13, 14.3, 15.4, 17.7, 19.9, 19.9, 20.6, 21.6, 23, 24.1, 25.15, 26, 26.7, 27.4,
    28.6, 29.75, 31.5, 33.5, 35, 36, 37, 39.5, 40.3, 41.1, 41.1, 42, 43, 44.3, 44.6, 46, 46.2
  ];
  
  // Calculate the average increase per week
  const totalWeeks = weights.length - 1;
  const totalIncrease = weights[weights.length - 1] - weights[0];
  const averageIncrease = totalIncrease / totalWeeks;
  
  // Generate the average increase line data
  export const averageLine = weights.map((_, index) => weights[0] + averageIncrease * index);