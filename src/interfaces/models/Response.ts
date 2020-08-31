import { Document } from 'mongoose';

import { QuestionDocument } from './Question';
import { FormDocument } from './Form';
import { QuestionTypeAlias } from '../../enums';
import { ID } from '../../types';
import { Timestamps } from '../general';

interface Answer {
  [QuestionTypeAlias.CheckBox]?: ID[] | string[];
  [QuestionTypeAlias.Date]?: Date[];
  [QuestionTypeAlias.DropDown]?: ID[] | string[];
  [QuestionTypeAlias.Email]?: string;
  [QuestionTypeAlias.ImageChoice]?: ID[] | string[];
  [QuestionTypeAlias.Link]?: string;
  [QuestionTypeAlias.LongText]?: string;
  [QuestionTypeAlias.Matrix]?: number[][];
  [QuestionTypeAlias.NPS]?: number;
  [QuestionTypeAlias.Number]?: number;
  [QuestionTypeAlias.Phone]?: string;
  [QuestionTypeAlias.RadioButton]?: ID[] | string[];
  [QuestionTypeAlias.ShortText]?: string;
  [QuestionTypeAlias.Slider]?: number;
  [QuestionTypeAlias.SortList]?: ID[] | string[];
}

export interface AnswerAndQuestion {
  question: QuestionDocument | ID;
  answer: Answer;
}

export interface ResponseInterface {
  form: Partial<FormDocument> | ID;
  answersAndQuestions: AnswerAndQuestion[];
}

export interface ResponseDocument
  extends ResponseInterface,
  Document,
  Timestamps { }
