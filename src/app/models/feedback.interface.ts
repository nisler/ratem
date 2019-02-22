export interface Feedback {
    feedback_txt: string;
    rating: number;
    assignment_id: string;
    assignment_name: string;
    assignment_is_in_progress: boolean;
    assignment_desc: string;
    course_id: string;
    course_name: string;
    semester_id: string;
    semester_name: string;
    semester_is_current: boolean;
}
