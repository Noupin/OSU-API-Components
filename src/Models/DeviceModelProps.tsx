export interface DeviceModelProps{
    ModelURL: string
    ImageURL: string
    width: number
    height: number
    xRot?: number
    yRot?: number
    zRot?: number
    bgColor?: string
    activation?: number
    continuous?: boolean
    glassmorphic?: boolean
}