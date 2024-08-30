import { create } from "zustand";

export interface StaffMember {
	_id: string;
	username: string;
	role: string;
	email: string;
}

interface StaffStore {
	staffData: StaffMember[];
	setStaffData: (data: StaffMember[]) => void;
	addStaffMember: (newMember: StaffMember) => void;
	removeStaffMember: (id: string) => void;
	updateStaffMember: (updatedMember: StaffMember) => void;
}

const useStaffStore = create<StaffStore>((set) => ({
	staffData: [],
	setStaffData: (data) => set({ staffData: data }),
	addStaffMember: (newMember) =>
		set((state) => ({
			staffData: [...state.staffData, newMember],
		})),
	removeStaffMember: (id) =>
		set((state) => ({
			staffData: state.staffData.filter((staff) => staff._id !== id),
		})),
	updateStaffMember: (updatedMember) =>
		set((state) => ({
			staffData: state.staffData.map((staff) =>
				staff._id === updatedMember._id ? updatedMember : staff
			),
		})),
}));

export default useStaffStore;
