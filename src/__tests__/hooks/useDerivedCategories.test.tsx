import { renderHook } from '@testing-library/react';
import { useProjectWithDerivedCategories, useProjectsWithDerivedCategories } from '@/hooks/useDerivedCategories';
import { deriveCategories } from '@/lib/utils/deriveCategories';
import type { Project, Skill, Category } from '@/lib/sanity/queries';
import { Wrapper } from '../../testUtils/testUtils';

jest.mock('@/lib/utils/deriveCategories');

const mockDeriveCategories = deriveCategories as jest.MockedFunction<typeof deriveCategories>;

const skill: Skill = {
  _id: 'skill1',
  _type: 'skill',
  title: 'React',
  slug: { current: 'react', _type: 'slug' },
  category: { _ref: 'cat1', _type: 'reference' }
};
const category: Category = {
  _id: 'cat1',
  _type: 'category',
  title: 'Frontend',
  slug: { current: 'frontend', _type: 'slug' },
  iconName: 'react',
};

const projectWithCategories: Project = {
  _id: 'proj1',
  _type: 'project',
  title: 'Project With Categories',
  skills: [skill],
  categories: [category],
  slug: { current: 'proj1', _type: 'slug' },
};

const projectWithoutCategories: Project = {
  _id: 'proj2',
  _type: 'project',
  title: 'Project Without Categories',
  skills: [skill],
  categories: [],
  slug: { current: 'proj2', _type: 'slug' },
};

describe('useProjectWithDerivedCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null if input is null', () => {
    const { result } = renderHook(() => useProjectWithDerivedCategories(null));
    expect(result.current).toBeNull();
  });

  it('returns project unchanged if it already has categories', () => {
    const { result } = renderHook(() => useProjectWithDerivedCategories(projectWithCategories));
    expect(result.current).toBe(projectWithCategories);
    expect(mockDeriveCategories).not.toHaveBeenCalled();
  });

  it('returns project with derived categories if it has skills but no categories', () => {
    mockDeriveCategories.mockReturnValue([category]);
    const { result } = renderHook(() => useProjectWithDerivedCategories(projectWithoutCategories));
    expect(result.current).toEqual({ ...projectWithoutCategories, categories: [category] });
    expect(mockDeriveCategories).toHaveBeenCalledWith(projectWithoutCategories.skills);
  });
});

describe('useProjectsWithDerivedCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty array if input is empty', () => {
    const { result } = renderHook(() => useProjectsWithDerivedCategories([]));
    expect(result.current).toEqual([]);
  });

  it('returns projects unchanged if they already have categories', () => {
    const projects = [projectWithCategories];
    const { result } = renderHook(() => useProjectsWithDerivedCategories(projects));
    expect(result.current).toEqual(projects);
    expect(mockDeriveCategories).not.toHaveBeenCalled();
  });

  it('returns projects with derived categories if any have skills but no categories', () => {
    mockDeriveCategories.mockReturnValue([category]);
    const projects = [projectWithoutCategories, projectWithCategories];
    const { result } = renderHook(() => useProjectsWithDerivedCategories(projects));
    expect(result.current).toEqual([
      { ...projectWithoutCategories, categories: [category] },
      projectWithCategories,
    ]);
    expect(mockDeriveCategories).toHaveBeenCalledWith(projectWithoutCategories.skills);
  });
});
