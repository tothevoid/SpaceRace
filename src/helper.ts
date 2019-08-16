export const checkCollision = 
    (obj1X: number, obj1Y: number, 
        obj1Width: number, obj1Height: number,
        obj2X: number, obj2Y: number,
        obj2Width: number, obj2Height: number): boolean => 
  	((obj1X + obj1Width >= obj2X) && (obj1X <= obj2X + obj2Width)) &&
  	((obj1Y + obj1Height >= obj2Y) && (obj1Y <= obj2Y + obj2Height))
