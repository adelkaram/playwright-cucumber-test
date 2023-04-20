import { HMSUser } from '../models/hms-user.model';
import { Reservation } from '../models/reservation.model';
import * as moment from 'moment';
import { Page } from '@playwright/test';

export class ReservationAPI {
    readonly page: Page;
    readonly request;

    private apiURL: string = 'https://test.kwentra.com/api/reservation/individualreservation';

    constructor(page) {
        this.page = page
        this.request = this.page.request
    }

    async createReservation(user: HMSUser, tenantID: number, payload: Partial<Reservation>) {
        console.log('body', this.setReservationPayloadDefaults(payload))
        return await this.request.post(`${this.apiURL}/v2/?tenant_id=${tenantID}`, {
            data:
                this.setReservationPayloadDefaults(payload)
            ,
            headers: {
                Authorization: 'Basic ' + btoa(`${user.userName}:${user.password}`)
            }
        });
    }

    async changeReservationState(user: HMSUser, tenantID: number, reservationID: number, state: string, reason?: string, forceDirty?: boolean) {
       return await this.request.patch(`${this.apiURL}/${reservationID}/change_state/?tenant_id=${tenantID}`, {
            data:
                { state: state, reason: reason, force_dirty: forceDirty }
            ,
            headers: {
                Authorization: 'Basic ' + btoa(`${user.userName}:${user.password}`)
            }
        });
    }

    setReservationPayloadDefaults(request: Partial<Reservation>): Reservation {
        return {
            check_in_time: request.check_in_time ?? '14:00:00',
            check_out_time: request.check_out_time ?? '12:00:00',
            purpose_of_stay: request.purpose_of_stay ?? '1',
            confirmation_type: request.confirmation_type ?? 'Confirmed',
            rate_confirmation: request.rate_confirmation ?? 'Confirmed',
            reservation_confirmation: request.reservation_confirmation ?? 'Confirmed',
            reservation_mode: request.reservation_mode ?? 'daily',
            arrival_date: request.arrival_date ?? '',
            departure_date: request.departure_date ?? '',
            do_not_move: request.do_not_move ?? false,
            room_nights: request.room_nights ?? [
                {
                    room_type: "1",
                    rate: null,
                    actual_room_type: "1",
                    room_number: 1,
                    from_date: request.arrival_date ?? '',
                    to_date: moment(request.departure_date).isSame(request.arrival_date) ? request.arrival_date :
                        moment(request.departure_date).clone().subtract(1, 'day').format('YYYY-MM-DD'),
                    children: [],
                    number_of_adults: 1,
                    number_of_children: 0,
                    manual_rate: true,
                    currency: '1',
                    rate_amount: '90',
                }
            ],
            name: request.name ?? 1,
            other_names: request.other_names,
            country: request.country ?? 'EG',
            channel: request.channel ?? 2,
            updated_on: null,
            overbook: true,
            outofservice: true,
            share: true,
            ...request
        };
    }

}