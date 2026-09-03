import { reactive } from 'vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App.vue';

const route = reactive({ path: '/' });

vi.mock('vue-router', () => ({
  RouterLink: {
    props: ['to'],
    template: '<a><slot /></a>',
  },
  RouterView: {
    template: '<div />',
  },
  useRoute: () => route,
}));

describe('App theme toggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    route.path = '/';
  });

  it('uses light mode by default', () => {
    mount(App);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('procurement-theme')).toBe('light');
  });

  it('loads persisted dark mode', () => {
    localStorage.setItem('procurement-theme', 'dark');
    mount(App);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('switches theme and persists selection', async () => {
    const wrapper = mount(App);

    await wrapper.get('.theme-toggle').trigger('click');

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('procurement-theme')).toBe('dark');
  });
});
