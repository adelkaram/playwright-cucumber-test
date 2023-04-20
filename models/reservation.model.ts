export interface Reservation {
	id?: number;
	arrival_date: string;
	departure_date: string;
	check_in_time: string;
	check_out_time: string;
	market?: number;
	source?: number;
	channel: number;
	state?: string;
	country: string;
	actual_departure_date?: string;
	name: number;
	other_names?: number[];
	guarantee_type?: string;
	purpose_of_stay: string;
	reservation_mode: string;
	room_nights: ReservationRoomNights[];
	updated_on?: string;
	confirmation_type: string;
	rate_confirmation?: string;
	reservation_confirmation?: string;
	overbook: boolean;
	share?: boolean;
	do_not_move?: boolean;
	company?: string;
	voucher_no?: string;
	booker?: string;
	outofservice: boolean;
	allow_voucher_no?: boolean;

}

export interface ReservationRoomNights {
	room_type: string;
	rate?: number;
	actual_room_type: string;
	from_date: string;
	to_date?: string;
	children: Children[];
	number_of_adults: number;
	number_of_children: number;
	parent_room_category?: number;
	parent_room_type?: number;
	room_number?: number;
	manual_rate: boolean;
	currency?: string;
	rate_amount?: string;
	guest_remarks?: string;
}

export interface Children {
	age: number;
	child_rate: string;
}
