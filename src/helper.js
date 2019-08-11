export const checkCollision = 
    (obj1X, obj1Y, 
        obj1Width, obj1Height,
        obj2X, obj2Y,
        obj2Width, obj2Height) => {
	var XColl=false;
  	var YColl=false;

  	if ((obj1X + obj1Width >= obj2X) && (obj1X <= obj2X + obj2Width)) XColl = true;
  	if ((obj1Y + obj1Height >= obj2Y) && (obj1Y <= obj2Y + obj2Height)) YColl = true;

  	if (XColl&YColl)
  		return true;
  	return false;
}