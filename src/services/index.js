import course from './course';
import user from './user';
import file from './file';
import s3 from './s3Client';
import session from './session';
import assignment from './assignment';
import jwt from './jwt';

export {
    course as courseService,
    user as userService,
    jwt as jwtService,
    file as fileService,
    s3 as s3Service,
    session as sessionService,
    assignment as assignmentService
}
