export interface InputListProductUseCaseDto {}

interface OutputListProductUseCaseItemDto {
    id: string
    name: string
    price: number
}

export interface OutputListProductUseCaseDto {
    list: Array<OutputListProductUseCaseItemDto>
}