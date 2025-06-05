
// Main Private Colleges Database - Aggregates all regional data
import { southIndiaPrivateColleges } from './southIndiaPrivateColleges';
import { northIndiaPrivateColleges } from './northIndiaPrivateColleges';
import { westIndiaPrivateColleges } from './westIndiaPrivateColleges';
import { centralIndiaPrivateColleges } from './centralIndiaPrivateColleges';
import { eastIndiaPrivateColleges } from './eastIndiaPrivateColleges';
import { karnatakaBangalorePrivateColleges } from './karnatakaBangalorePrivateColleges';
import { hyderabadChennaiPrivateColleges } from './hyderabadChennaiPrivateColleges';

export const privateColleges = [
  ...northIndiaPrivateColleges,
  ...westIndiaPrivateColleges,
  ...centralIndiaPrivateColleges,
  ...eastIndiaPrivateColleges,
  ...karnatakaBangalorePrivateColleges,
  ...hyderabadChennaiPrivateColleges,
  ...southIndiaPrivateColleges
];

export const getAllPrivateStates = () => {
  const states = Array.from(new Set(privateColleges.map(college => college.state)));
  return states.sort();
};
