import Validatorinterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup";

export default class CustomerYupValidator
  implements Validatorinterface<Customer>
{
  valiadate(entity: Customer): void {
   try {
    yup
    .object()
    .shape({
      id: yup.string().required('Id is required'),
      name: yup.string().required('Name is required'),
    })
    .validateSync(
      {
        id: entity.id,
        name: entity.name,
      },
      { abortEarly: false }
    );
   } catch (error) {
        const e = error as yup.ValidationError
        e.errors.forEach(error => {
            entity.notification.addError({
                context: 'customer',
                message: error
            })
        })
   }
  }
}
