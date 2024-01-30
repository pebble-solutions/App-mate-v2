const CompColor = require("complementary-colors");

export function getRGBGradientColors(baseColor: string): string[]
{
    const compColor = new CompColor(baseColor)
    const col = compColor.analogous()

    return [`rgb(${col[1].r},${col[1].g},${col[1].b})`, `rgb(${col[2].r},${col[2].g},${col[2].b})`]
}