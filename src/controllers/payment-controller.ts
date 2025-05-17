
import type { Request, Response } from 'express'
import { logger } from '../config/logger/logger'
import { createPixPaymentService } from '../services/create-payment'

export const createPixPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await createPixPaymentService(req.body)
    logger.info('Pix de pagamento criado com sucesso')
    res.status(200).json(result)
  } catch (error) {
    const status =
      error instanceof Error && 'statusCode' in error
        ? (error as any).statusCode
        : 500
    const message =
      error instanceof Error ? error.message : 'Erro interno do servidor'
    logger.error(`Erro ao criar pagamento: ${message}`)
    res.status(status).json({
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      error,
    })
  }
}
