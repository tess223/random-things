import service from './index';

/**
 * 向AI发送问题
 * @param {string} question 用户提出的问题
 */
export const askAI = (question) => {
  return service({
    url: '/ai/ask',
    method: 'post',
    data: {
      question,
    },
  });
};