import { Owner } from './owner.model';

export interface Car {
    owner: Owner;
    specs: String;
    imageUrl: String;
}
