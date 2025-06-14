import { supabase, TABLES } from '../config/supabase';
import { FormValues, CalculationResult } from '../types';

export interface Project {
  id?: string;
  name: string;
  description?: string;
  province?: string;
  district?: string;
  building_location?: string;
  storage_type?: string;
  target_temperature?: number;
  target_humidity?: number;
  room_shape?: string;
  length?: number;
  width?: number;
  height?: number;
  total_load?: number;
  calculation_result?: CalculationResult;
  created_at?: string;
  updated_at?: string;
}

export class ProjectService {
  /**
   * Yeni proje oluştur
   */
  static async createProject(project: Project): Promise<Project> {
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .insert([project])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Tüm projeleri getir
   */
  static async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Belirli bir projeyi getir
   */
  static async getProjectById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  /**
   * Projeyi güncelle
   */
  static async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Projeyi sil
   */
  static async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.PROJECTS)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  /**
   * Hesaplama sonucunu kaydet
   */
  static async saveCalculation(
    projectId: string,
    inputData: FormValues,
    result: CalculationResult
  ): Promise<void> {
    const { error } = await supabase
      .from(TABLES.CALCULATIONS)
      .insert([{
        project_id: projectId,
        input_data: inputData,
        total_load: result.totalLoad,
        components: result.components,
        recommendations: result.recommendations,
        calculation_type: 'detailed'
      }]);

    if (error) throw error;
  }

  /**
   * Proje hesaplama geçmişini getir
   */
  static async getCalculationHistory(projectId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from(TABLES.CALCULATIONS)
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}