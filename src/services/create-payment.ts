import { Payment } from 'mercadopago'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../config/logger/logger'
import { client } from '../config/mercadopago/mercadopago'
import { AppError } from '../errors/AppError'
import { PixPaymentInput } from '../types/payment.types'

export const createPixPaymentService = async (
  data: Partial<PixPaymentInput>
) => {
  const requiredFields = [
    'transaction_amount',
    'description',
    'email',
    'first_name',
    'last_name',
    'cpf',
  ]
  const missingFields = requiredFields.filter(
    field => !data[field as keyof PixPaymentInput]
  )
  if (missingFields.length > 0) {
    logger.error(`Campos ausentes: ${missingFields.join(', ')}`)
    throw new AppError(`Campos ausentes: ${missingFields.join(', ')}`, 400)
  }

  const paymentInstance = new Payment(client)

  const paymentData = {
    transaction_amount: Number(data.transaction_amount),
    description: data.description,
    payment_method_id: 'pix',
    payer: {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      identification: {
        type: 'CPF',
        number: String(data.cpf),
      },
    },
  }
  const requestOptions = { idempotencyKey: uuidv4() }
  const response = await paymentInstance.create({
    body: paymentData,
    requestOptions,
  })
  return response
}